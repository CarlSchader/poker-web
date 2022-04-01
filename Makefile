DOCKER_HUB_USERNAME = carlschader
SERVICE_NAME = poker-web

run:
	docker-compose -f docker/docker-compose.yaml up --build

kill:
	docker-compose -f docker/docker-compose.yaml  down

build:
	docker build -t poker-web:latest -f docker/Dockerfile .

publish:
	docker login
	docker run --privileged --rm tonistiigi/binfmt --install all
	docker buildx create --use --name ${SERVICE_NAME}

	docker buildx build \
	--push \
	--platform linux/amd64,linux/arm/v7,linux/arm64/v8,linux/ppc64le,linux/s390x \
	--tag ${DOCKER_HUB_USERNAME}/${SERVICE_NAME}:latest \
	-f docker/Dockerfile .

	docker buildx stop ${SERVICE_NAME}
	docker buildx rm ${SERVICE_NAME}