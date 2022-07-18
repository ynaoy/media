export const UrlHelper = () => {
  const FetchResponse = (url: string,params: {}) => { return $fetch(url,params) }
  return { FetchResponse: FetchResponse}
}