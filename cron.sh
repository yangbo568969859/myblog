image_version=`date + %Y%m%d%H%M`
echo $image_version;
# cd middledata.analysis
git pull --rebase origin master
docker stop vue-docker1;
docker rm vue-docker1;
docker build -t vue-docker1:$image_version .;
docker images;
docker run -p 3000:80 -d --name vue-docker1 vue-docker1:$image_version;
docker logs vue-docker1;
#删除build过程中产生的镜像    #docker image prune -a -f
docker rmi $(docker images -f "dangling=true" -q)