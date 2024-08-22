pipeline {
    agent any
    tools {
        maven 'Maven'
    }
    
    environment {
        DB_URL = 'jdbc:your_database_url'
        DB_USER = 'your_database_username'
        DB_PWD = 'your_database_password'
        VERSION = "0.0.25"
    }

    stages {
        stage('build frontend') {
            steps {
                bat "echo Building Stage 1"
                bat "cd frontend && npm install && npm run build"
            }
        }

        stage('deploy frontend') {
            steps {
                withAWS(region: 'us-east-1', credentials: 'AWS_CREDENTIALS') {
                    bat "aws s3 sync frontend/dist s3://crag-supply-co-client"
                }
            }
        }

        stage('build backend') {
            steps {
                withMaven(maven: 'Maven') {
                    bat "cd backend && mvn clean install -DskipTests=true -Dspring.profiles.active=build"
                }
            }
        }

        stage('test backend') {
            steps {
                bat "echo unit tests happened here"
            }
        }

        stage('deploy backend') {
            steps {
                withAWS(region: 'us-east-1', credentials: 'AWS_CREDENTIALS') {
                    bat '''
                    for /f "delims=" %%i in ('dir /b backend\\target\\*.jar') do set JAR_FILE=%%i
                    aws s3 cp backend\\target\\%JAR_FILE% s3://crag-supply-co-backend/
                    echo Deploying %JAR_FILE%
                    aws elasticbeanstalk create-application-version ^
                        --application-name crag-supply-co ^
                        --version-label %VERSION% ^
                        --source-bundle S3Bucket=crag-supply-co-backend,S3Key=%JAR_FILE%
                    aws elasticbeanstalk update-environment ^
                        --environment-name Crag-supply-co-env-4 ^
                        --version-label %VERSION%
                    '''
                }
            }
        }

    }
}
