#!/bin/bash

# env vars from metadata
# SQL_IP=$(curl "http://metadata/computeMetadata/v1/project/attributes/sql-ip" -H "Metadata-Flavor: Google")
# SQL_PW=$(curl "http://metadata/computeMetadata/v1/project/attributes/sql-password" -H "Metadata-Flavor: Google")
DJANGO_SECRET=$(curl "http://metadata/computeMetadata/v1/project/attributes/django-secret" -H "Metadata-Flavor: Google")


# update, install things as needed
sudo apt-get update
sudo apt-get install -y -qq python-pip git

# pull GH repo
git init
git pull git@github.com:aschuman0/lakebottom_radio.git
cd ~/projects/lake_bottom/

# install requirements
sudo pip install -r requirements.txt

# db migrations
python manage.py makemigrations
python manage.py migrate

# stand up server
sudo gunicorn lake_bottom.lake_bottom.wsgi --bind=0.0.0.0:80
