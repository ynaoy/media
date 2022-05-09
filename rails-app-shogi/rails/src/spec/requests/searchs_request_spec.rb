require 'rails_helper'

RSpec.describe "Searchs", type: :request do

  describe "Post  /search" do
    it "returns http success" do
      post search_path, params: { search: { query: "相居飛車"} }
      expect(response).to have_http_status(:success)
    end
  end

end
