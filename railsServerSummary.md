## Create a Simple Rails App
    rails -v
    Rails 4.2.6
 
## Create a Simple Rails App
    rails new tomgdow
    cd tomgdow/
    bundle install
    rails generate scaffold Product name:string description:text price:float
    rake db:migrate 
   
## Start Rails Server
    rails s -b 0.0.0.0

    => Booting WEBrick
    => Rails 4.2.6 application starting in development on http://0.0.0:3000
    => Run `rails server -h` for more startup options
    => Ctrl-C to shutdown server
    [2016-07-31 00:06:29] INFO  WEBrick 1.3.1
    [2016-07-31 00:06:29] INFO  ruby 2.3.0 (2015-12-25) [x86_64-linux]
    [2016-07-31 00:06:29] INFO  WEBrick::HTTPServer#start: pid=26443 port=3000
### Display Welcome Page
    Started GET "/" 
    ActiveRecord::SchemaMigration Load (3.9ms)  SELECT "schema_migrations".* FROM "schema_migrations"
    Processing by Rails::WelcomeController#index as HTML
    Rendered /home/tomgdow/.rvm/gems/ruby-2.3.0/gems/railties-4.2.6/lib/rails/templates/rails/welcome/index.html.erb (2.8ms)

### Show All Products
    Started GET "/products"
    Processing by ProductsController#index as HTML
    SELECT "products".* FROM "products"
    Rendered products/index.html.erb within layouts/application

### Show an Individual Product
    Started GET "/products/1"
    Processing by ProductsController#show as HTML
    Parameters: {"id"=>"1"}
    SELECT  "products".* FROM "products" WHERE "products"."id" = ? LIMIT 1  [["id", 1]]
    Rendered products/show.html.erb within layouts/application (1.7ms)

### Display New Product Page
    Started GET "/products/new" for 10.0.2.2 at 2016-07-31 00:23:11 +0100
    Processing by ProductsController#new as HTML
    Rendered products/_form.html.erb (125.8ms)
    Rendered products/new.html.erb within layouts/application (158.7ms)

### Create New Product
    Started POST "/products" 
    Processing by ProductsController#create as HTML
    Parameters: {"utf8"=>"✓", "authenticity_token"=>"o8NhYVAcyAr9KMh8ZvX5qy7kOJ5uHUJVSm5+MDhUp2Nke39FknZN2ZfONoBoSI71lqnWk5sUFSzCN75Zh27DOQ==", "product"=>{"name"=>"Chair", "description"=>"Piece of Furniture", "price"=>"22"}, "commit"=>"Create Product"}
    SQL (17.8ms)  INSERT INTO "products" ("name", "description", "price", "created_at", "updated_at") VALUES (?, ?, ?, ?, ?)  [["name", "Chair"], ["description", "Piece of Furniture"], ["price", 22.0], ["created_at", "2016-07-30 23:25:18.446121"], ["updated_at", "2016-07-30 23:25:18.446121"]]
    (149.3ms)  commit transaction  
    Redirected to http://localhost:3000/products/7

    Started GET "/products/7"
    Processing by ProductsController#show as HTML
    Parameters: {"id"=>"7"}
    Product Load (2.4ms)  SELECT  "products".* FROM "products" WHERE "products"."id" = ? LIMIT 1  [["id", 7]]
    Rendered products/show.html.erb within layouts/application (0.8ms)

### Display Edit Product Page
    Started GET "/products/7/edit"
    Processing by ProductsController#edit as HTML
    Parameters: {"id"=>"7"}
    Product Load (0.2ms)  SELECT  "products".* FROM "products" WHERE "products"."id" = ? LIMIT 1  [["id", 7]]
    Rendered products/_form.html.erb (32.5ms)   
    Rendered products/edit.html.erb within layouts/application (55.0ms)

### Update Product

    Started PATCH "/products/7" 
    Processing by ProductsController#update as HTML
    Parameters: {"utf8"=>"✓", "authenticity_token"=>"7Z6JkNlw7XZrkOm9H6/XzGW83MV/RuzS8LL6tgNqD5sqJpe0GxpopQF2F0EREqCS3fEyyIpPu6t46zrfvFBrwQ==", "product"=>{"name"=>"Table", "description"=>"A four legged piece of furniture", "price"=>"22.0"}, "commit"=>"Update Product", "id"=>"7"}
    SELECT  "products".* FROM "products" WHERE "products"."id" = ? LIMIT 1  [["id", 7]]
    begin transaction
    SQL (0.7ms)  UPDATE "products" SET "name" = ?, "description" = ?, "updated_at" = ? WHERE "products"."id" = ?  [["name", "Table"], ["description", "A four legged piece of furniture"], ["updated_at", "2016-07-30 23:39:02.729367"], ["id", 7]]
    commit transaction
    Redirected to http://localhost:3000/products/7

    Started GET "/products/7" for 10.0.2.2 at 2016-07-31 00:39:03 +0100
    Processing by ProductsController#show as HTML
    Parameters: {"id"=>"7"}
    Product Load (0.2ms)  SELECT  "products".* FROM "products" WHERE "products"."id" = ? LIMIT 1  [["id", 7]]
    Rendered products/show.html.erb within layouts/application (1.0ms)

### Delete A Product

    Started DELETE "/products/7" for 10.0.2.2 at 2016-07-31 00:54:56 +0100
    Processing by ProductsController#destroy as HTML
    Parameters: {"authenticity_token"=>"REBYJIjAMXuDHu1qQ/0R38KJ1MR/tglsKGFAM6PrRJWD+EYASqq0qOn4E5ZNQGaBesQ6yYq/XhWgOIBaHNEgzw==", "id"=>"7"}
    Product Load (0.7ms)  SELECT  "products".* FROM "products" WHERE "products"."id" = ? LIMIT 1  [["id", 7]]
    begin transaction
    SQL (4.9ms)  DELETE FROM "products" WHERE "products"."id" = ?  [["id", 7]]
    commit transaction
    Redirected to http://localhost:3000/products

    Started GET "/products" for 10.0.2.2 at 2016-07-31 00:54:56 +0100
    Processing by ProductsController#index as HTML
    Product Load (1.1ms)  SELECT "products".* FROM "products"
    Rendered products/index.html.erb within layouts/application (9.6ms)

