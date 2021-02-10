#!/bin/bash
set -e

rm -rf static
python manage.py collectstatic --noinput
gcloud app deploy