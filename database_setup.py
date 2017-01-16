import os
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(254), nullable=False)
    picture = Column(String(2083))

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'picture': self.picture
        }


class UserProvider(Base):
    """Represents each social login for a local user"""
    __tablename__ = 'user_provider'

    id = Column(Integer, primary_key=True)
    provider = Column(String(254), nullable=False)
    provider_uid = Column(String(254), nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)


class Restaurant(Base):
    __tablename__ = 'restaurant'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    creator_id = Column(Integer, ForeignKey('user.id'))
    creator = relationship(User)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'id': self.id,
        }


class MenuItem(Base):
    __tablename__ = 'menu_item'

    name = Column(String(80), nullable=False)
    id = Column(Integer, primary_key=True)
    description = Column(String(250))
    price = Column(String(8))
    course = Column(String(250))
    restaurant_id = Column(Integer, ForeignKey('restaurant.id'))
    restaurant = relationship(Restaurant)
    creator_id = Column(Integer, ForeignKey('user.id'))
    creator = relationship(User)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'description': self.description,
            'id': self.id,
            'price': self.price,
            'course': self.course,
        }


db_path = os.path.join(os.path.dirname(__file__), 'restaurant_menu_with_users.db')
engine = create_engine('sqlite:///{}'.format(db_path))

Base.metadata.create_all(engine)
