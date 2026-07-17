// Technician Authentication Service
// Manages technician credentials and login verification

export interface TechnicianCredentials {
  id: string;
  email: string;
  password: string;
  name: string;
}

export class TechnicianAuthService {
  private static STORAGE_KEY = 'technician_credentials';

  // Store new technician credentials (called by admin)
  static saveTechnicianCredentials(credentials: TechnicianCredentials) {
    const existingCredentials = this.getAllCredentials();
    
    // Check if technician already exists
    const existingIndex = existingCredentials.findIndex(c => c.id === credentials.id);
    
    if (existingIndex >= 0) {
      existingCredentials[existingIndex] = credentials;
    } else {
      existingCredentials.push(credentials);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingCredentials));
  }

  // Get all stored technician credentials
  static getAllCredentials(): TechnicianCredentials[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Verify technician login
  static verifyLogin(email: string, password: string): TechnicianCredentials | null {
    const credentials = this.getAllCredentials();
    const found = credentials.find(c => c.email === email && c.password === password);
    return found || null;
  }

  // Get technician by ID
  static getTechnicianById(id: string): TechnicianCredentials | null {
    const credentials = this.getAllCredentials();
    return credentials.find(c => c.id === id) || null;
  }

  // Delete technician credentials
  static deleteTechnicianCredentials(id: string) {
    const credentials = this.getAllCredentials();
    const filtered = credentials.filter(c => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  // Initialize default demo credentials if none exist
  static initializeDefaultCredentials() {
    const existing = this.getAllCredentials();
    if (existing.length === 0) {
      const defaults = [
        {
          id: 'tech_001',
          email: 'john.tech@gmail.com',
          password: 'tech123',
          name: 'John Tech',
        },
        {
          id: 'tech_002',
          email: 'sarah.repair@gmail.com',
          password: 'tech123',
          name: 'Sarah Repair',
        },
        {
          id: 'tech_003',
          email: 'mike.service@gmail.com',
          password: 'tech123',
          name: 'Mike Service',
        },
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaults));
    }
  }
}

// Initialize on load
if (typeof window !== 'undefined') {
  TechnicianAuthService.initializeDefaultCredentials();
}
