echo Deploy de $HOST
echo $CI_REPOSITORY_URL
echo git@gitlab.com:$CI_PROJECT_PATH
echo branch: $CI_COMMIT_REF_NAME
echo Listando pasta de sites:

USE_HOST=$HOST

cd /var/www
ls -la

if [ -d $USE_HOST ]
then
    echo Existe o diretório $USE_HOST
    cd $USE_HOST
else
    echo Não Existe o diretório $USE_HOST, criando...
    sudo mkdir $USE_HOST
    cd $USE_HOST
fi  

if [ -d .git ]
then
    sudo git remote set-url origin $CI_REPOSITORY_URL
    sudo git remote -v
    sudo git checkout $CI_COMMIT_REF_NAME  
    sudo git pull origin $CI_COMMIT_REF_NAME
else
    sudo git clone $CI_REPOSITORY_URL .
    sudo git checkout $CI_COMMIT_REF_NAME  
    sudo git pull origin $CI_COMMIT_REF_NAME
fi

cd /var/www/$USE_HOST

echo Executando instalação de pacotes em ambiente virtual
pyenv local api.carol.orango.io
pip install -r requirements.txt

supervisorctl reread
supervisorctl update
supervisorctl restart api_carol

exit