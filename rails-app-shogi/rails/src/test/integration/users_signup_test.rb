require "test_helper"

class UsersSignupTest < ActionDispatch::IntegrationTest

  test "invalid signup information" do
    get signup_path
    #assert_template 'users/new'
    assert_no_difference 'User.count' do
      post signup_path, params: { user: { name:  "",
                                         email: "user@invalid",
                                         password:              "pass",
                                         password_confirmation: "pas" } }
    end
    assert_template 'users/new'
    assert_select 'div#error_explanation'
    assert_select 'div.field_with_errors'
    assert_select 'li',"Name can't be blank"
    assert_select 'li',"Email is invalid"
    assert_select 'li',"Password is too short (minimum is 8 characters)"
    assert_select 'li',"Password confirmation doesn't match Password"
    assert_select 'form[action="/users"]'
  end

  test "valid signup information " do
   get signup_path
   assert_difference 'User.count', 1 do
     post signup_path, params: { user: { name:  "Example_User",
                                         email: "user@example.com",
                                         password:              "password",
                                         password_confirmation: "password" } }
   end
   follow_redirect!
   assert_template 'application/home'
 end
end
