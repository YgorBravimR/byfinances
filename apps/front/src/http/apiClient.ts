import ky from "ky"

export const authApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
})
