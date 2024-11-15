# Start containers
up:
	docker compose up -d
.PHONY: up

# Stop containers
stop:
	docker compose stop
.PHONY: stop

# Open a shell in the app container
shell:
	docker compose exec app /bin/bash
.PHONY: shell
