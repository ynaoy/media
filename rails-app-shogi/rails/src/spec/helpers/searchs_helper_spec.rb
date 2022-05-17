require 'rails_helper'

RSpec.describe SearchsHelper, type: :helper do
  describe "japanese_encode" do

    it "should work" do
      encoded = helper.japanese_encode("こんにちは",query:"query")
      expect(encoded).not_to eq "query=こんにちは"
    end

  end

end
