pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {

        stage('Install Dependencies') {
            steps {
                // 'bat' runs commands through Windows cmd.exe
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Downloads Chromium/Firefox/WebKit binaries needed to run tests
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Executes all Playwright test specs
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Publishes the Playwright HTML report as a link on the build page
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}