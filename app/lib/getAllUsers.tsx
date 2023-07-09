const getAllUsers = async() => {

  const res = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()

}
export default getAllUsers