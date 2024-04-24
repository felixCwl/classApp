docker login -u "classappservice" -p "Cwl61234;" docker.io
docker build -f Dockerfile -t classappservice/class-app-file-service:master .
docker images
docker push classappservice/class-app-file-service:master
