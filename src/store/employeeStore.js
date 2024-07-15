import { makeAutoObservable, runInAction } from 'mobx';
import {$authHost, $host} from "../http/index";

class EmployeeStore {
  employees = [];
  currentUser = null;
  isLoading = false;
  error = null;
  isAuthenticated = false;
  role = null

  constructor() {
    makeAutoObservable(this);
  }

  fetchEmployees = async () => {
    this.isLoading = true;
    try {
      const response = await $host.get('/api/employee');
      runInAction(() => {
        this.employees = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  fetchEmployee = async (employeeId) => {
    this.isLoading = true;
    try {
      const response = await $host.get(`/api/employee/${employeeId}`);
      runInAction(() => {
        this.employees = response.data;
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  loginEmployee = async (loginData) => {
    this.isLoading = true;
    try {
      const response = await $host.post('/api/employee/login', loginData);
      runInAction(() => {
        this.currentUser = response.data;
        this.isAuthenticated = true;
        this.role = response.data.role
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  logoutEmployee = () => {
    runInAction(() => {
      this.currentUser = null;
      this.isAuthenticated = false; 
      this.role = null
    });
  };

  createEmployee = async (employeeData) => {
    this.isLoading = true;
    try {
      const response = await $host.post('/api/employee/registration', employeeData);
      runInAction(() => {
        this.employees.push(response.data);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };

  updateEmployee = async (employeeId, updatedData) => {
    this.isLoading = true;
    try {
      const response = await $host.patch(`/api/employee/${employeeId}`, updatedData);
      runInAction(() => {
        this.employees = this.employees.map((employee) =>
          employee.id === employeeId ? response.data : employee
        );
      });
    } catch (err) {
      this.error = err;
    } finally {
        this.isLoading = false;
    }
  };

  deleteEmployee = async (employeeId) => {
    this.isLoading = true;
    try {
      await $host.delete(`/api/employee/${employeeId}`);
      runInAction(() => {
        this.employees = this.employees.filter((employee) => employee.id !== employeeId);
      });
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  };
}

export default EmployeeStore;