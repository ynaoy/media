export const UrlHelper = () => {
  const FetchResponse = (url: string,params: {[key:string]:any}
    ):Promise<any> => { return $fetch(url,params) }
  return { FetchResponse: FetchResponse}
}