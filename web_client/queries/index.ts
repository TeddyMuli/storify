import { API_URL } from "@/constants";
import axios from "axios";

interface User {
  user_id: string;
  email: string;
}

export const fetchOrganizations = async (user: User | undefined | null) => {
  try {
    const response = await axios.get(`${API_URL}/organization/fetch/all/${user?.user_id}`)
    const organizations = response.data
    return organizations  
  } catch (error: any) {
    console.error("Error fetching organizations: ", error)
    return error.response ? error.response : { data: { error: "Unknown error occurred" } };
  }
}

export const fetchOrganization = async (organizationId: string) => {
  try {
    const response = await axios.get(`${API_URL}/organization/fetch/specific/${organizationId}`)
    const organization = response.data
    return organization
  } catch (error: any) {
    console.error("Error fetching organization: ", error)
    return error.response ? error.response : { data: { error: "Unknown error occurred" } };
  }
}

export const fetchFolders = async (organizationId: string) => {
  try {
    const response = await axios.get(`${API_URL}/folder/fetch/all/${organizationId}`)
    const folders = response.data
    return folders
  } catch (error: any) {
    console.error("Error fetching folders: ", error)
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

export const fetchRootFiles = async (organizationId: string) => {
  try {
    const response = await axios.get(`${API_URL}/file/fetch/all/${organizationId}`)
    const files = response.data
    console.log("Root Files: ", files)
    return files
  } catch (error: any) {
    console.error("Error fetching files: ", error)
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

export const fetchChildFiles = async (organizationId: string, folderId: string) => {
  try {
    const response = await axios.get(`${API_URL}/file/fetch/all/${organizationId}/${folderId}`)
    const files = response.data
    return files
  } catch (error: any) {
    console.error("Error fetching files: ", error)
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

export const fetchFolder = async (folderId: string) => {
  try {
    const response = await axios.get(`${API_URL}/folder/fetch/specific/${folderId}`)
    const folder = response.data
    return folder  
  } catch (error: any) {
    console.error("Error fetching folder: ", error)
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

export const fetchFolderHierarchy = async (folderId: string) => {
  const folderHierarchy = [];
  let currentFolderId = folderId;

  while (currentFolderId) {
    const folder = await fetchFolder(currentFolderId);
    folderHierarchy.push(folder);
    currentFolderId = folder.parent_folder_id || null;
  }

  return folderHierarchy.reverse();
};

export const fetchRootFolders = async (organizationId: string) => {
  try {
    const response = await axios.get(`${API_URL}/folder/fetch/children/${organizationId}/root`)
    const folders = response.data
    return folders
  } catch (error: any) {
    console.error("Error fetching folders: ", error)
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

export const fetchChildrenFolders = async (organizationId: string, parentFolderId: string) => {
  try {
    const response = await axios.get(`${API_URL}/folder/fetch/children/${organizationId}/${parentFolderId}`)
    const folders = response.data
    return folders
  } catch (error: any) {
    console.error("Error fetching folders: ", error)
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

export const fetchDeletedFolders = async (organizationId: string) => {
  try {
    const response = await axios.get(`${API_URL}/folder/fetch/deleted/${organizationId}`)
    const folders = response.data
    return folders
  } catch (error: any) {
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

export const fetchDeletedFiles = async (organizationId: string) => {
  try {
    const response = await axios.get(`${API_URL}/file/fetch/deleted/${organizationId}`)
    const files = response.data
    return files
  } catch (error: any) {
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

export const getUser = async (userId: string | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/auth/fetch/specific/${userId}`)
    const user = response.data
    return user 
  } catch (error: any) {
    return error.response ? error.response : { data: { error: "Unknown error occurred" } }; 
  }
}

