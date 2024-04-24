docker login -u "classappservice" -p "Cwl61234;" docker.io
docker build -f Dockerfile -t classappservice/class-app-class-service:master .
docker images
docker push classappservice/class-app-class-service:master
