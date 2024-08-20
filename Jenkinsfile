pipeline {
    agent any

    stages {
        stage('stage name') {
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
