pipeline {
    agent any
    
    environment {
        DB_URL = 'jdbc:your_database_url'
        DB_USER = 'your_database_username'
        DB_PWD = 'your_database_password'
    }

    stages {
        stage('build frontend') {
            steps {
                sh "echo Building Stage 1"
                sh "cd frontend && npm install && npm run build"
            }
        }

        stage('deploy frontend') {
            steps {
                withAWS(region: 'us-east-1', credentials: 'AWS_CREDENTIALS') {
                    sh "aws s3 sync frontend/dist s3://crag-supply-co-client"
                }
            }
        }

        stage('build backend') {
            steps {
                withAWS(region: 'us-east-1', credentials: 'AWS_CREDENTIALS') {
                    sh "cd backend && mvn clean install -DskipTests=true -Dspring.profiles.active=build"
                }
            }
        }

        stage('test backend') {
            steps {
                sh "echo unit tests happened here"
            }
        }

        stage('deploy backend') {
            steps {
                withAWS(region: 'us-east-1', credentials: 'AWS_CREDENTIALS') {
                    sh "aws s3 sync backend/target/*.jar s3://crag-supply-co-backend"
                    sh '''
                    aws elasticbeanstalk create-application-version \
                    --application-name crag-supply-co \
                    --version-label 0.0.1 \
                    --source-bundle S3Bucket=crag-supply-co-backend,S3Key=*.jar
                    '''
                    sh "aws elasticbeanstalk update-environment --environment-name Crag-supply-co-env-4 --version-label 0.0.1"
                }
            }
        }

        // stage('stage name') {
        //     steps {
        //         sh "echo Building Stage 1"
        //     }
            
        // }

        // stage('Test') {
        //     steps {
        //         sh "echo Testing Stage 2"
        //     }
        // }

        // stage('testGitWebhook') {
        //     steps {
        //         sh "echo testGitWebhook works"
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         sh "echo Deploy"
        //     }
        // }
    }
}
