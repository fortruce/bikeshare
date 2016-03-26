set -e
if [ -z "$2" ]; then
  echo "usage ./pushimage.sh <profile> <api_key>"
  exit 4
fi
$(aws ecr get-login --region us-east-1 --profile $1)
docker build --build-arg apikey=$2 -t bikeshare .
docker tag bikeshare:latest 961329116691.dkr.ecr.us-east-1.amazonaws.com/bikeshare:latest
docker push 961329116691.dkr.ecr.us-east-1.amazonaws.com/bikeshare:latest
