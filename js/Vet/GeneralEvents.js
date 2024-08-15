export const event_submit_pic = (parametersArray,event) => {    
    console.log(event)
    let path = $("#vet-pic-input").val().replace(`fakepath`,'')
    path = path.replace('C:','')    
    path = path.replace(/\\/, "")
    path = path.replace(/\\/, "")
    console.log(path)
}