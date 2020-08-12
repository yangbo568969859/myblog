# FROM node:12.18.3-alpine
# RUN apt-get update  && apt-get install -y nginx
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install
# COPY . .
# RUN npm run build
# RUN ln -sf /dev/stdout /var/log/nginx/access.log \
# 	&& ln -sf /dev/stderr /var/log/nginx/error.log
# EXPOSE 80
# RUN cp -r middle_data_analysis/* /var/www/html \
#     && rm -rf /user/src/app
# CMD ["nginx","-g","daemon off;"]

FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
COPY . .
RUN npm run production
# 配置nginx
FROM nginx
# RUN rm /etc/nginx/conf.d/nginx.conf
COPY --from=build-stage /app/middle_data_analysis/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf