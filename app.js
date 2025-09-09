// Premium HR AI Analyzer - JavaScript
// Modern ES6+ implementation with comprehensive functionality

class HRAnalyzer {
    constructor() {
        this.currentFiles = [];
        this.analysisResults = null;
        this.chart = null;

        // Application data
        this.competencyAreas = [
            "Programming", "Machine Learning", "Data Analysis", "Communication",
            "Leadership", "Design Thinking", "DevOps & Cloud", "Project Management",
            "Research", "Problem Solving"
        ];

        this.profileTemplates = [
            {
                name: "Старший разработчик",
                competencies: {
                    "Programming": 92, "Machine Learning": 78, "Data Analysis": 85,
                    "Communication": 68, "Leadership": 82, "Design Thinking": 45,
                    "DevOps & Cloud": 71, "Project Management": 63, "Research": 67,
                    "Problem Solving": 89
                },
                strengths: [
                    "Экспертные навыки программирования с глубоким пониманием архитектуры",
                    "Отличные способности к решению сложных технических задач",
                    "Сильные лидерские качества для руководства командой",
                    "Хорошая база в машинном обучении и анализе данных"
                ],
                improvements: [
                    "Развитие навыков дизайн-мышления для лучшего UX",
                    "Усиление коммуникативных навыков для работы с бизнесом",
                    "Улучшение навыков управления проектами",
                    "Расширение исследовательских компетенций"
                ]
            },
            {
                name: "ML-инженер",
                competencies: {
                    "Programming": 83, "Machine Learning": 96, "Data Analysis": 91,
                    "Communication": 74, "Leadership": 52, "Design Thinking": 38,
                    "DevOps & Cloud": 67, "Project Management": 49, "Research": 94,
                    "Problem Solving": 87
                },
                strengths: [
                    "Экспертные знания в области машинного обучения и ИИ",
                    "Выдающиеся исследовательские и аналитические способности",
                    "Сильные навыки программирования в Python/R/SQL",
                    "Отличное понимание статистики и математических методов"
                ],
                improvements: [
                    "Развитие лидерских и управленческих навыков",
                    "Улучшение навыков дизайн-мышления",
                    "Усиление компетенций в области DevOps",
                    "Развитие навыков управления проектами"
                ]
            },
            {
                name: "Fullstack разработчик",
                competencies: {
                    "Programming": 88, "Machine Learning": 51, "Data Analysis": 69,
                    "Communication": 72, "Leadership": 58, "Design Thinking": 79,
                    "DevOps & Cloud": 84, "Project Management": 65, "Research": 46,
                    "Problem Solving": 81
                },
                strengths: [
                    "Отличные навыки фронтенд и бэкенд разработки",
                    "Сильные компетенции в DevOps и облачных технологиях",
                    "Хорошее понимание дизайна и пользовательского опыта",
                    "Solid навыки решения технических проблем"
                ],
                improvements: [
                    "Углубление знаний в области машинного обучения",
                    "Развитие исследовательских навыков",
                    "Усиление лидерских компетенций",
                    "Улучшение навыков анализа данных"
                ]
            }
        ];

        this.chartColors = [
            "#0891b2", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
            "#06b6d4", "#84cc16", "#f97316", "#ec4899", "#6366f1"
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
    }

    setupEventListeners() {
        // File input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }

        // Analyze button
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.startAnalysis());
        }

        // Action buttons
        const analyzeAnotherBtn = document.getElementById('analyzeAnotherBtn');
        if (analyzeAnotherBtn) {
            analyzeAnotherBtn.addEventListener('click', () => this.resetApp());
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        if (!uploadArea) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => this.highlight(uploadArea), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => this.unhighlight(uploadArea), false);
        });

        uploadArea.addEventListener('drop', (e) => this.handleDrop(e), false);
        uploadArea.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight(element) {
        element.style.borderColor = 'var(--color-primary)';
        element.style.backgroundColor = 'rgba(8, 145, 178, 0.05)';
    }

    unhighlight(element) {
        element.style.borderColor = 'var(--color-gray-300)';
        element.style.backgroundColor = 'transparent';
    }

    handleDrop(e) {
        const files = e.dataTransfer.files;
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = e.target.files;
        this.processFiles(files);
    }

    processFiles(files) {
        this.currentFiles = Array.from(files).filter(file => {
            const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                              'image/jpeg', 'image/jpg', 'image/png'];
            return validTypes.includes(file.type);
        });

        if (this.currentFiles.length === 0) {
            this.showToast('Пожалуйста, выберите файлы в поддерживаемых форматах (PDF, DOCX, JPG, PNG)', 'error');
            return;
        }

        this.displayFilePreview();
        this.showToast(`Загружено файлов: ${this.currentFiles.length}`, 'success');
    }

    displayFilePreview() {
        const filePreview = document.getElementById('filePreview');
        const fileList = document.getElementById('fileList');
        const analyzeBtn = document.getElementById('analyzeBtn');

        if (!filePreview || !fileList || !analyzeBtn) return;

        fileList.innerHTML = '';

        this.currentFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';

            const fileExtension = file.name.split('.').pop().toUpperCase();
            const fileSize = (file.size / 1024 / 1024).toFixed(2);

            fileItem.innerHTML = `
                <div class="file-icon">${fileExtension}</div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">${fileSize} МБ • ${file.type}</div>
                </div>
            `;

            fileList.appendChild(fileItem);
        });

        filePreview.style.display = 'block';
        analyzeBtn.style.display = 'block';

        // Animate file items
        const fileItems = fileList.querySelectorAll('.file-item');
        fileItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    async startAnalysis() {
        this.showLoadingSection();
        this.hideSection('upload-section');

        // Simulate analysis progress
        await this.simulateProgress();

        // Generate analysis results
        this.generateAnalysisResults();

        // Show results
        this.showResults();
    }

    showLoadingSection() {
        const loadingSection = document.getElementById('loadingSection');
        if (loadingSection) {
            loadingSection.style.display = 'block';
            loadingSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    hideSection(sectionId) {
        const section = document.querySelector('.' + sectionId);
        if (section) {
            section.style.display = 'none';
        }
    }

    async simulateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');

        if (!progressFill || !progressText) return;

        const steps = [
            { progress: 20, text: 'Загрузка документов...' },
            { progress: 40, text: 'Обработка текста...' },
            { progress: 65, text: 'Анализ компетенций...' },
            { progress: 85, text: 'Генерация отчета...' },
            { progress: 100, text: 'Анализ завершен!' }
        ];

        for (let step of steps) {
            await new Promise(resolve => setTimeout(resolve, 800));
            progressFill.style.width = step.progress + '%';
            progressText.textContent = step.progress + '%';

            const loadingText = document.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = step.text;
            }
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    generateAnalysisResults() {
        // Select random profile template
        const template = this.profileTemplates[Math.floor(Math.random() * this.profileTemplates.length)];

        // Add some variation to the scores
        const competencies = {};
        Object.keys(template.competencies).forEach(key => {
            const baseScore = template.competencies[key];
            const variation = (Math.random() - 0.5) * 10; // ±5 points variation
            competencies[key] = Math.max(10, Math.min(100, Math.round(baseScore + variation)));
        });

        // Calculate overall score
        const scores = Object.values(competencies);
        const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

        this.analysisResults = {
            name: template.name,
            competencies: competencies,
            strengths: template.strengths,
            improvements: template.improvements,
            overallScore: overallScore
        };
    }

    showResults() {
        const loadingSection = document.getElementById('loadingSection');
        const resultsSection = document.getElementById('resultsSection');

        if (loadingSection) {
            loadingSection.style.display = 'none';
        }

        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }

        this.updateCandidateProfile();
        this.createCompetencyChart();
        this.updateAnalysisCards();
    }

    updateCandidateProfile() {
        const profileName = document.getElementById('profileName');
        const profileType = document.getElementById('profileType');
        const overallScore = document.getElementById('overallScore');

        if (profileName) profileName.textContent = 'Кандидат';
        if (profileType) profileType.textContent = this.analysisResults.name;
        if (overallScore) overallScore.textContent = this.analysisResults.overallScore;
    }

    createCompetencyChart() {
        const ctx = document.getElementById('competencyChart');
        if (!ctx || !this.analysisResults) return;

        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }

        const labels = Object.keys(this.analysisResults.competencies);
        const data = Object.values(this.analysisResults.competencies);

        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: this.chartColors,
                    borderWidth: 0,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '500'
                            },
                            color: '#4b5563'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        cornerRadius: 8,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0,
                        hoverBorderWidth: 2
                    }
                },
                cutout: '60%',
                animation: {
                    animateScale: true,
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    updateAnalysisCards() {
        this.updateStrengths();
        this.updateImprovements();
    }

    updateStrengths() {
        const strengthsList = document.getElementById('strengthsList');
        if (!strengthsList || !this.analysisResults) return;

        strengthsList.innerHTML = '';

        this.analysisResults.strengths.forEach((strength, index) => {
            const li = document.createElement('li');
            li.textContent = strength;
            li.style.opacity = '0';
            li.style.transform = 'translateY(10px)';

            strengthsList.appendChild(li);

            setTimeout(() => {
                li.style.transition = 'all 0.3s ease';
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    updateImprovements() {
        const improvementsList = document.getElementById('improvementsList');
        if (!improvementsList || !this.analysisResults) return;

        improvementsList.innerHTML = '';

        this.analysisResults.improvements.forEach((improvement, index) => {
            const li = document.createElement('li');
            li.textContent = improvement;
            li.style.opacity = '0';
            li.style.transform = 'translateY(10px)';

            improvementsList.appendChild(li);

            setTimeout(() => {
                li.style.transition = 'all 0.3s ease';
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
    }

    resetApp() {
        // Reset state
        this.currentFiles = [];
        this.analysisResults = null;

        // Destroy chart
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }

        // Reset UI
        const filePreview = document.getElementById('filePreview');
        const resultsSection = document.getElementById('resultsSection');
        const loadingSection = document.getElementById('loadingSection');
        const uploadSection = document.querySelector('.upload-section');

        if (filePreview) filePreview.style.display = 'none';
        if (resultsSection) resultsSection.style.display = 'none';
        if (loadingSection) loadingSection.style.display = 'none';
        if (uploadSection) uploadSection.style.display = 'block';

        // Reset file input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.showToast('Приложение сброшено. Можно загружать новые файлы.', 'success');
    }

    exportReport() {
        if (!this.analysisResults) return;

        const reportData = {
            timestamp: new Date().toISOString(),
            candidateType: this.analysisResults.name,
            overallScore: this.analysisResults.overallScore,
            competencies: this.analysisResults.competencies,
            strengths: this.analysisResults.strengths,
            improvements: this.analysisResults.improvements,
            files: this.currentFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `hr-analysis-report-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('Отчет экспортирован успешно!', 'success');
    }

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HRAnalyzer();
});

// Add slide out animation for toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);