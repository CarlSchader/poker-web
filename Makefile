DOCKER_HUB_USERNAME = carlschader
SERVICE_NAME = poker-web

run:
	docker-compose up --build

kill:
	docker-compose down

build:
	docker build -t poker-web:latest .

publish:
	docker login
	docker run --privileged --rm tonistiigi/binfmt --install all
	docker buildx create --use --name ${SERVICE_NAME}

	docker buildx build \
	--push \
	--platform linux/amd64,linux/arm/v7,linux/arm64/v8,linux/ppc64le,linux/s390x \
	--tag ${DOCKER_HUB_USERNAME}/${SERVICE_NAME}:latest .

	docker buildx stop ${SERVICE_NAME}
	docker buildx rm ${SERVICE_NAME}