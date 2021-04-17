from 'gitlab/gitlab-ce:latest'

ENV PORT 80
ENV PERSONAL_ACCESS_TOKEN superduperstrongtoken
ENV GITLAB_ROOT_PASSWORD password
ENV GITLAB_OMNIBUS_CONFIG "gitlab_rails['monitoring_whitelist'] = ['0.0.0.0/0', '172.17.0.1']; gitlab_rails['external_url'] = 'http://localhost:$PORT';"

COPY ./before_script.rb /opt/gitlab/embedded/service/gitlab-rails/db/fixtures/production/40_access_token.rb

ENTRYPOINT ./assets/wrapper
