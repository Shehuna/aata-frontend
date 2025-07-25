import axios from "axios"

export const fetchSubcities = async () =>{
      let subcities 
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/subcity", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          subcities = response.data.subcities
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
      return subcities
  }

  export const fetchTaxTypes = async () =>{
      let taxtypes
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/taxtype", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          taxtypes = response.data.taxtypes
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
      return taxtypes
  }

  export const fetchTaxYear = async () =>{
      let taxtyears
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/taxyear", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          taxtyears = response.data.taxyears
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
      return taxtyears
  }

export const fetchRespondent = async () =>{
      let respondents
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/respondent", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          respondents = response.data.respondents
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
      return respondents
  }

export const fetchCategory = async () =>{
      let categories
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/category", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          categories = response.data.categories
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
      return categories
  }

export const fetchAppealers = async () =>{
      let appealers
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/appealer", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          appealers = response.data.appealers
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
      return appealers
  }

  export const fetchUsers = async () =>{
      let users
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/user", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          users = response.data.users
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
      return users
  }