pipeline {
    agent any

    stages {
        stage('stage name') {
            steps {
                sh "echo Building Stage 1"
            }
            
        }

        stage('Test') {
            steps {
                sh "echo Testing Stage 2"
            }
        }

        stage('testGitWebhook') {
            steps {
                sh "echo testGitWebhook works"
            }
        }

        stage('Deploy') {
            steps {
                sh "echo Deploy"
            }
        }
    }
}
