setx DOCKER_BUILDKIT 0
#setx COMPOSE_DOCKER_CLI_BUILD 1
docker login -u "classappservice" -p "Cwl61234;" docker.io
docker build -f Dockerfile -t classappservice/class-app-web:master .
docker images
docker push classappservice/class-app-web:master
