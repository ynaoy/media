module SearchsHelper
  # URIに入れる日本語をencodeする
  def japanese_encode(str, query:"query")
    URI.encode_www_form(query: str)
  end
end
