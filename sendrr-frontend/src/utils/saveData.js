export const saveData = (data)=>{  
    localStorage.setItem("data", JSON.stringify(data))
    return data
}

export const getData = ()=>{
    let data = JSON.parse(localStorage.getItem("data"))
    return data
}