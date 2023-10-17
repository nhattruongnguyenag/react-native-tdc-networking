export const handleDataClassification = (temp: any, type: string) => {
  const facultyPost = temp.data.filter((item: any) => item.user['roleCodes'] === type)
  return facultyPost
}
