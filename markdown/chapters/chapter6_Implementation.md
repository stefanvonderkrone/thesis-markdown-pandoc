# Implementation

The Star-Exec-Presenter is a web application written in Haskell and based upon the Yesod Web Framework. In this chapter I will talk about the actual implementation of the tool as well as about the benefits of using especially Haskell and Yesod.

## Haskell

_"Haskell is a general purpose, purely functional programming language incorporating many recent innovations in programming language design. Haskell provides higher-order functions, non-strict semantics, static polymorphic typing, user-defined algebraic datatypes, pattern-matching, list comprehensions, a module system, a monadic I/O system, and a rich set of primitive datatypes, including lists, arrays, arbitrary and fixed precision integers, and floating-point numbers. Haskell is both the culmination and solidification of many years of research on non-strict functional languages."_ [@peyton_jones_haskell_2003, @marlow_haskell_2010]

This quote stems from Simon Peyton Jones and his paper "Haskell 98 language and libraries: the revised report" as well as from the paper "Haskell 2010 Language Report" by Simon Marlow. It does sum up the important features of the Haskell programming language. In addition I want to add that Haskell has type inference and its type system is very expressive. In the following I try to explain the listed terms.

Haskell is a general purpose programming language which means it can be used to develop a web-server, a desktop application as well as a simple commandline tool. It is suited for a wide range of application domains. Haskell is a purely functional programming language, that is, it follows the functional programming paradigm and every pure function has no side effect. Functional programming relies on a mathematical approach where every calculation is defined by expressions. Everything is an expression, wether it's a function or a value. Purely means, that a function only works with its input arguments and returns the same result no matter how often it is called with the same arguments. Every expression is immutable so once they are defined they cannot be changed anymore. Haskell code therefore is easily testable and even proofable. In contrast, imperative programming languages allow mutability and functions are subroutines that can have side effects. A side effect for instance can be a simple tracing that doesn't effect the function's result or it can be the change of a global state.

```haskell
-- example of a pure function
mul a b = a * b

-- example of an impure function
mulM a b = do
    putStrLn ("multiplying " ++ (show a) ++ " with " ++ (show b))
    return (a * b)
```

It is important to note that, unlike programming languages like Java or C, Haskell is indentation based. So, there are no blocks surrounded by curly brackets, but every whitespace at the beginning of each line has a meaning to the program.

### Higher-Order Functions

Haskell has higher-order function and emphasizes their usage. Higher-order function are functions that require functions as input parameters or return a function. Therefore functions are data that can be passed round. Thanks to currying all functions are higher-order functions and thereby expressions. Currying means that a function always returns a new function if it isn't called with the full list of arguments.

```haskell
-- example for a higher-order function
map :: (a -> b) -> [a] -> [b]
map _ []     = []               -- special case for an empty list
map f (x:xs) = f x : map f xs   -- f applied to the list's head
                                -- recursive call of map with
                                -- the list's rest
```

### Pattern-Matching

The example from above also shows pattern-matching, a rich programming technique to identify certain cases for a given expression. The `map` function from above has two implementations, one for the case of the empty list which also is the base case for the recursion, and the main implementation that declares the algorithm of the function. Pattern matching helps simplifying code by reducing the usage of if-statements and alike.

### List Comprehensions

To stay with the `map` function, list comprehensions are another way to define this method as well as lists in general. They are similar to set comprehensions in mathematics. For example the list comprehension `[ 2*x | x <- [1..10] ]` is equivalent to the set comprehension $\{2x|x \in \mathbb{N},x \le 10\}$. [@lipovaca_learn_2012] Both expressions result in a list of even natural numbers from two to 20. Referecing the `map` function from above, an alternative implementation follows:

```haskell
map f xs = [ f x | x <- xs ]
```

Another example of list comprehensions is the solution to the first problem of Project Euler (https://projecteuler.net/problem=1). The exercise is to find the sum of all multiples of three or five below 1000:

```haskell
sum [x | x <- [3..999], x `mod` 3 == 0 || x `mod` 5 == 0]
```

### Non-Strict Semantics, Lazy Evaluation

Another essential feature of Haskell is the non-strict semantics. Non-strict in terms of Haskell means that every expression is evaluated by need. So, only declaring an expression doesn't invoke its evaluation until it's needed, e.g. for output. For instance the fibonacci sequence can be seen as an infinite list. This sequence can also be implemented via a list comprehension:

```haskell
let fibs = 0 : 1 : [ a + b | (a, b) <- zip fibs (tail fibs)]
```

Here, we have the declaration of an infinite list, but which will be evaluated only up until its seventh position. These non-strict semantics in Haskell are implemented as _lazy evaluation_ which leeds to the expression from above also being evaluated by need. So until it is really needed, `fibs` is only a thunked[^thunk] expression. But this strategy can lead to high memory usage especially for complex algorithms, so in some cases it is advised to use strict evaluation which can be used with the `seq` function in Haskell's `Prelude` module. Other modules with strict evaluations for example are `Data.Map.Strict` or `Data.List` the latter having a strict implementation of the `Prelude`'s `foldl` function. Especially this function can lead to a stack overflow with a large list.[^foldl]

[^thunk]: a value that is yet to be evaluated
[^foldl]: https://www.haskell.org/haskellwiki/Foldr_Foldl_Foldl%27

### Type System, Type Inference

Haskell has a rich type system which can automatically infer the type of an expression. For example the fibonacci sequence from above has the type `fibs :: Num b => [b]` which was inferred bei the `(+)` operator's type (`(+) :: Num a => a -> a -> a`). Not all types can be inferred and the compiler outputs a compiler error, so a type signature should be added. In most cases these signatures are optional but also can help improving the readability of the code. These signatures doesn't contain any special type information because they are polymorphic, that is, they can be used with any type that meets the functions requirements, may it be `Int` or `Double`. Polymorphic types are denoted by small alphanumeric characters like `a`, `b` or `t0`. They can be restricted by a type-class which is a set of functions. The `(+)` operator is a function of the `Num` type-class which is a set of functions to operate on numerical values. Type-classes are similar to interfaces of imperative programming languages like Java.

### Algebraic Datatypes

With Haskell a developer can declare custom algebraic datatypes. What that means is that a type can be defined by the algebraic operations _sum_ and _product_, where a _sum_ is a group of alternative data constructors and _product_ is the combination of them. Below are some examples:

```haskell
-- sum of polymorphic types
data Either a b = Left a | Right b

-- product of polymorphic types
data Pair a b = Pair a b

-- a record datatype
data Record a b =
  Record
    { memberA :: a
    , memberB :: b
    }
```

The `Either` datatype is a special type that is used for computations that can result in an error, where the `Left` constructor contains the error and the `Right` constructor holds the successful result. This leads to Haskell's expressiveness which is one of the benefits of its type system. The `Either` datatype explains that a function can return an error, so a developer has to consider the returned value. Java in contrast is more verbose by forcing to add a `throws` statement to the method definition. A developer has to use a `try ... catch` block to manage an error. Another example for the expressive type system of Haskell is the `Maybe` datatype whose signature follows:

```haskell
data Maybe a = Nothing | Just a
```

This datatype is used for computations that can have no result or that require optional arguments. The `Nothing` constructor means that there is no value, whereas the `Just` constructor wraps a result or an optional argument. The `Maybe` is usefull because it prevents `undefined` or `null` values via the type system. In Java, for example, careless developed programs can pass the compiler but also result in a `NullPointerException` whose cause can be difficult to resolve. Of course, that doesn't mean that a Haskell program doesn't have errors, but the type system and the compiler helps to reduce them or event prevent them all.

### Modules

Haskell has a distinct module system, where each module contains a well-matched set of functions, types and type-classes. The Haskell code base is separated into a large number of modules, each one serving a certain kind of purpose. Each Haskell program has a main module which contains the main function as well as a set of other modules. It is important to know that, without any additional language extensions, a bunch of modules cannot be defined circularly, that is module A cannot import module B it this already imports module A.

### Input/Output, Monads

All these features and benefits of Haskell are of no use if it can't communicate with the real world, that is doing input/output. So, Haskell has an appropriate I/O system which is also monadic[^monad]. That means that every function that operates within the IO-Monad has a special type signature. Below are some examples:

[^monad]: A Monad is an abstract datatype, that wraps a (primitive) value in a context and binds it to a function operating within that context

```haskell
putChar     :: Char -> IO ()
putStrLn    :: String -> IO ()
getLine     :: IO String
readFile    :: FilePath -> IO String
writeFile   :: FilePath -> String -> IO ()
```

All functions return a value within the context of the IO-Monad. To access the content it must be bound to a function that processes it. For example, the `putStrLn` function can be implemented via the `putChar` function and a monadic composition (`(>>)`):

```haskell
putStrLn' s = mapM_ putChar s >> putChar '\n'
```

This implementation uses the monadic version of the `map` function to put each `Char` of the given `String` to the output followed by a newline. To simplify the work with the IO-Monad or Monads in general Haskell has the do-notation which I want to explain with the following example:

```haskell
func_do f g h = do
    a <- f              -- binds the wrapped value of f to a
    b <- g              -- binds the wrapped value of g to b
    c <- h              -- binds the wrapped value of h to c
    return (a, b, c)    -- wraps the result in the default context

func_bind f g h =
    f >>= \a ->
        g >>= \b ->
            h >>= \c ->
                return (a, b, c)
```

Both functions essentially do the same. They take three monadic values (e.g. `Maybe a`) and bind the content of these values to `a`, `b` and `c`. The first function uses do-notation, the second one uses the bind-Operator (`(>>=)`). The do-notation is a sugared way of using the bind-Operator, that is the compiler transforms the code of `func_do` to the code of `func_bind`. It is the same with all functions of the IO-Monad. But there is one important note: The IO-Monad is impure. What does this mean? All functions in Haskell are pure unless they use the IO-Monad. Because this Monad communicates with the real world, Haskell has no control of this communication. That means, that every call of an IO-function the result is not garanteed to be the same. A File could have changed since the last time it was read. Another good example is the operation system's random number generator. Each time, it produces another value, so this process can never be pure.

[@osullivan_real_2010]

## Yesod Web Framework

The Yesod Web Framework is a set of tools and libraries build with Haskell. It aims to improve the development of server-side, RESTful web applications by providing type-safety, conciseness and performance. It is devided into several components that together form the final web application. Yesod consists of an object-relational mapping for the communication with a database, several domain-specific languages (DSLs) for routes, templates and the database types, it has session- and forms-handling as well as the support for authentication, authorization or internationalization. All DSLs are implemented with Template Haskell, an extension to the GHC[^ghc] to enable metaprogramming. Template Haskell code will be transformed to actual Haskell while compiling. [@sheard_template_2002]

[^ghc]: Glaskow Haskell Compiler, the most used compiler infrastructure for Haskell

The basis of Yesod is the Warp server which is a fast web server build in Haskell. It is the main implementation of the Web Application Interface which in turn is generalized interface for building web server. It generally considers the nature of the web infrastructure, where the communication essentially works like a function: a client sends a request und gets a response in return. This communication can be illustrated with the following type signature:

```haskell
askServer :: Request -> Response
```

WAI aims to be an efficient interface by relying an lazy IO, which leads to a small memory footprint. An example of a small WAI implementation follows below:

```haskell
{-# LANGUAGE OverloadedStrings #-}
import Network.Wai
import Network.HTTP.Types (status200)
import Network.Wai.Handler.Warp (run)

application _ respond = respond $
  responseLBS status200 [("Content-Type", "text/plain")] "Hello World"

main = run 3000 application
```

This program takes a request and responses with the text "Hello World", regardless of what the request may contain. A more complex example considers the requested path (route) and responds according to that:

```haskell
{-# LANGUAGE OverloadedStrings #-}
 
import Network.Wai
import Network.Wai.Handler.Warp
import Network.HTTP.Types (status200)
import Blaze.ByteString.Builder (copyByteString)
import qualified Data.ByteString.UTF8 as BU
import Data.Monoid
 
main = do
  putStrLn $ "Listening on port 3000"
  run 3000 app
 
app req respond = do
  let res = case pathInfo req of
        ["yay"] -> yay
        ["foo","bar"] -> foobar
        x -> index x
  respond res
 
yay = responseBuilder status200
  [ ("Content-Type", "text/plain") ]
  $ mconcat $ map copyByteString [ "yay" ]
 
index x = responseBuilder status200
  [("Content-Type", "text/html")] $ mconcat $ map copyByteString
  [ "<p>Hello from ", BU.fromString $ show x, "!</p>"
  , "<p><a href='/yay'>yay</a></p>\n" ]

foobar = responseBuilder status200
  [("Content-Type", "text/html")] $ mconcat $ map copyByteString
  [ "<p>Hello from foobar! ;)</p>" ]
```

### Routes

Yesod has a more complex mechanism for handling requests build atop of WAI and Warp. The routes are defined via a special DSL which concentrates on the path and method of each request. A path is devided into one or more path pieces each one being static or dynamic, where dynamic parts are representated by a distinct type. There can be can be a single dynamic path piece as well as any number. Each path is followed by the handler resource and the supported method which can be a standard HTTP method or even a custom one. The handler resource is the connection to the Haskell code. Template Haskell generates a handler function for each route and method as well as special datatype representing the route. This datatype enables typesafe URLs. In the section "REST interface" in chapter six I showed an example of the routes DSL. Below is an explaining example:

```
-- the home route
-- generates the handler "getHome"
-- "HomeR" is the datatype for this route
/               HomeR       GET

-- the list of users
-- generates the handler "getListUsers" and "postListUsers"
-- "ListUsersR" is the datatype for this route
/users          ListUsersR  GET POST

-- generates the handler "getUser" and "postUser"
-- "UserR UserId" is the datatype for this route
/users/#UserId  UserR       GET POST

-- generates the handler "getList"
-- "ListR [Text]" is the datatype for this route
-- "Texts" is a type synomym for "[Text]"
/list/*Texts    ListR       GET

-- special routes for static files and authentication
/static StaticR Static getStatic
/auth   AuthR   Auth   getAuth
```

### Templates

Yesod uses templates for HTML, JavaScript and CSS[^css] as type-safe expressions which are inserted into the application at compile time. Again, Template Haskell takes care of them. Templates can are inserted into the handler functions via Quasi-Quoters, some of which take the template code while others need to get the filename of the template. So, Yesod is very flexible.

[^css]: Cascading Stylesheet

In Yesod all template DSLs are named after a Shakespear charactor. For HTML, there is the Hamlet markup language:

```html
<div>
  <h1>#{myTitle}
  <p>
    <a href="@{MyCustomRouteR}">my custom route</a>
  $maybe val <- maybeVal
    <p>val
  $nothing
    <p>There is Nothing to show here
  $if null someList
    <ul>
      $forall item <- someList
        <li>#{show item}
  $else
    <p>The List is empty
^{footerWidget}
```

As you can see, the syntax is very similar to real HTML. But, it is important to note, that Hamlet is mostly indentation based. _Mostly_ means, that indentation is used for block elements like `div`, `p` or headlines, so these elements doesn't have a closing tag in Hamlet. Actually they would cause a compiletime error. Inline elements such as anchor tags (`<a href=""></a>`) must have a closing tag. The integration with actual Haskell code has several incarnations. The first example is the interpolation of the expression `myTitle` which is bracketed by `#{...}`. It will be inserted into the the HTML code with the `toHtml` function of the `ToHtml` type-class. So every expression must be an instance of this type-class to be interpolated. The next feature of Hamlet is typesafe URLs which incorporates with the routes definition. The resource datatypes from the routes DSL can be used here. So an expression bracketed by `@{...}` generates a typesafe URL within a `href` attribute. This is possible for all attributes containing a path to a resource.

Another feature is the special treatment of `Maybe` values as well as lists. Here, special statements intialize Haskell code which handles the values. So a `Maybe` value will be unwrapped (`$maybe`) or an optional information can be shown if there is `Nothing` (`$nothing`). The same applies to lists where the statement `$forall` indicates a loop to process all items of a list. Additionally, there are logical statements like `$if`/`$else` as well as `$case`/`$of`, the latter also supporting pattern matching. And to shorten inconveniently long expressions a new one can be declared via `$with shortExp <- longExp`.

The shakespearean templates are round out with the DLSs Julius for JavaScript and Lucius as well as Cassius for CSS. Julius is basically JavaScript with the features of interpolation. Lucius and Cassius are both an optimized subset of CSS equivalent to the likes of SASS[^sass] or Less[^less]. They feature nested blocks, interpolated expressions, variable declaration as well as mixins. Mixins are reusable code blocks, e.g. for dealing with vendor prefixes. Whereas Lucius is more like original CSS with curly brackets enclosing the CSS statements, Cassius is intendation based. Below is an code example for Lucius taken from Star-Exec-Presenter:

[^sass]: a dynamic stylesheet language for CSS (http://sass-lang.com/)
[^less]: a dynamic stylesheet language for CSS (http://lesscss.org/)

```css
@colorYes: #80FFB0;
...

.table > tfoot > tr {
    > td.solver-yes,
    > th.solver-yes {
        background-color: #{colorYes};
    }
    ...
}
```

### Persistence

For the communication with and the integration of a database, Yesod relies on the persistent framework. This framework enables a generalized way of working with the database regardless of its kind, may it be SQL or NoSQL. Even for persistent datatypes there is a DSL which simplifies their declaration as there a many special types incorporating. Below is an example:

```
User
    ident Text
    password Text Maybe
    UniqueUser ident
```

This is a simple example of representation of a user in the database. Just like most DSLs, this one is indentation based, too. It declares the type `User` with two member and a uniqueness constraint. Each member is defined by its name followed by its type. Unlike Haskell where an optional type is defined by `Maybe a`, the persistent DSL requires `Maybe` to be at the end of the declaration. A unique constraint is defined with the prefix `Unique` to the type's name as well as the names of one or more members of the type. From this definition several types are generated. First and foremost a record datatype will be defined representing the actual type. This datatype is made instance of several type-classes to make them compatible with the persistent interface. Additionally a data constructor is available to represent a unique instance of the data in the database. There are also several datatype for filtering the data table by specific constraints. Some example outcomes follow:

```haskell
data User = User { ident :: Text, password :: Maybe Text }

data UniqueUser User
```

[@snoyman_developing_2012]
<!-- add latest (online) version of book as reference -->
