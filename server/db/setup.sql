--This script is to create the entire database structure

/*First we create the database and a new user.  You should update the below w/ a different pw for prod*/

CREATE DATABASE gitBegin;

CREATE USER 'gitBegin'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON gitBegin.* TO 'gitBegin'@'localhost';

/*Before running this part you need to login as the gitBegin user (or some user w/ permission on the db)*/
use gitBegin;
CREATE TABLE issues (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  id int NOT NULL,
  number int,
  repo_name nvarchar(50),
  org_name nvarchar(50),
  title nvarchar(2000) NOT NULL,
  comments int,
  created_at datetime,
  updated_at datetime,
  html_url nvarchar(255),
  assignee nvarchar(255),
  body nvarchar(1500),
  labels nvarchar(1000)
);

CREATE TABLE repos (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  id int,
  name nvarchar(100) not null,
  org_name nvarchar(50) not null,
  html_url nvarchar(255),
  language nvarchar(100),
  beginner_tickets int,
  description nvarchar(1000),
  stargazers_count int,
  watchers_count int,
  has_wiki bool,
  has_pages bool,
  open_issues int,
  forks int,
  created_at datetime,
  updated_at datetime,
  pushed_at datetime,
  data_refreshed_at datetime,
  record_inserted_at datetime,
  etag nvarchar(50),
  subscribers_count int,
  network_count int
);

CREATE TABLE users (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  login nvarchar(50) not null,
  id int UNSIGNED not null,
  avatar_url nvarchar(255),
  gravatar_id nvarchar(255),
  url nvarchar(100),
  html_url nvarchar(100),
  followers_url nvarchar(100),
  following_url nvarchar(100),
  gists_url nvarchar(100),
  starred_url nvarchar(100),
  subscriptions_url nvarchar(100),
  organizations_url nvarchar(100),
  repos_url nvarchar(100),
  events_url nvarchar(100),
  received_events_url nvarchar(100),
  type nvarchar(25),
  site_admin bool,
  name nvarchar(100),
  company nvarchar(50),
  blog nvarchar(100),
  location nvarchar(50),
  email nvarchar(50),
  hireable bool,
  bio nvarchar(255),
  public_repos int UNSIGNED,
  public_gists int UNSIGNED,
  followers int UNSIGNED,
  following int UNSIGNED,
  created_at datetime,
  updated_at datetime,
  total_private_repos int UNSIGNED,
  owned_private_repos int UNSIGNED,
  private_gists int UNSIGNED,
  disk_usage int UNSIGNED,
  collaborators int UNSIGNED,
  plan_name nvarchar(25),
  plan_space int UNSIGNED,
  plan_private_repos int UNSIGNED,
  plan_collaborators int UNSIGNED,
  game_tickets_completed int UNSIGNED,
  game_level int UNSIGNED
);

CREATE TABLE pulls (
 internal_id INT AUTO_INCREMENT PRIMARY KEY,
 merged BOOLEAN not null,
 name nvarchar(100) not null,
 user_id INT not null,
 FOREIGN KEY (user_id)
  REFERENCES users(internal_id)
  ON DELETE CASCADE
);

CREATE TABLE repos_users (
  internal_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT not null,
  repo_id INT not null,
  FOREIGN KEY (user_id) REFERENCES users(internal_id) ON DELETE CASCADE,
  FOREIGN KEY (repo_id) REFERENCES repos(internal_id) ON DELETE CASCADE
);

CREATE INDEX OrgRepo ON repos (name ,org_name);
