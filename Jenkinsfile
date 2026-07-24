pipeline {
    agent any
    environment {
        CI = 'true'
        SLOWMO_MS = '1000'
    }
    stages {

        stage('Install Dependenciess') {
            steps {
             
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
                // Executes all Playwright test specs in Chrome with the browser window visible
                bat 'npx playwright test --headed --project=chromium'
            }
        }
    }

    post {
        always {

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