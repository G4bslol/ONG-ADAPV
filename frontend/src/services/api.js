const API_BASE_URL = 'http://localhost:3000';

class ApiService {

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        }

        try {
            const response = await fetch(url, config)
            if (!response.ok) {
                throw new Error(`HTTP error! Status ${response.status}`);
            }
            return await response.json();

        } catch (error) {
            console.error('Erro na requisição', error)
            throw error;

        }
    }

    // async getVagas() {
    //     return this.request('/Vagas')
    // }
    // async createVagas(vaga) {
    //     return this.request('/Vagas', {
    //         method: 'POST',
    //         body: JSON.stringify(vaga),
    //     });
    // }

    // async getCandidatos() {
    //     return this.request('/Candidatos');
    // }

    // async getCandidatoByNome(nome) {
    //     return this.request(`/Candidatos?nome=${nome}`);
    // }

    // async getCandidatosVaga() {
    //     return this.request(`/Vagas/Inscricoes/${null}`);
    // }

    // async createCandidato(candidato) {
    //     return this.request('/Candidatos', {
    //         method: 'POST',
    //         body: JSON.stringify(candidato),
    //     });
    // }

    // async getInscricoes(candidatoId) {
    //     console.log(candidatoId)
    //     return this.request(`/Candidatos/Inscricoes/${candidatoId}`);
    // }

    // async createInscricao({ candidatoId, vagaId }) {
    //     return this.request('/Candidatos/Inscricoes', {
    //         method: 'POST',
    //         body: JSON.stringify({ candidatoId, vagaId }),
    //     });
    // }

    async login(email, password) {
        return this.request('/Auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            credentials: 'include' // Para cookies
        })
    }

    async logout() {
        return this.request('/Auth/Logout', {
            method: 'POST',
            credentials: 'include'
        })
    }

    async checkAuth() {
        return this.request('/Auth/Me', {
            credentials: 'include'
        })
    }
}

export default new ApiService()

