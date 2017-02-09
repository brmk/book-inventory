# Install

### Install meteor:

```bash

curl https://install.meteor.com/ | sh

```

### Clone the project:

```bash

cd ~/workspace/
git clone git@bitbucket.org:fitfamtv/fitfam.git

```

### Start meteor

```bash

cd fitfam
meteor

```


### Connect to fitfam AWS EC2

Execute this command once after cloning the project:
```bash

chmod 400 ./config/fitfam-meteor.pem

```
To connect to EC2 use this command:
```bash

ssh -i "./.config/fitfam-meteor.pem" ubuntu@ec2-54-191-186-228.us-west-2.compute.amazonaws.com

```

To update deployment (in EC2):

```bash

cd workspace/fitfam/
git pull #pull changes from git
mup deploy

```

### Production URL
[http://54.191.186.228/sign-up](http://54.191.186.228/sign-up)