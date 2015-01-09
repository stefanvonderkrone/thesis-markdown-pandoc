# Implementation

The Star-Exec-Presenter is a web application written in Haskell and based upon the Yesod Web Framework. In this chapter I will talk about the actual implementation of the tool as well as about the benefits of using especially Haskell and Yesod.

## Haskell

_"Haskell is a general purpose, purely functional programming language incorporating many recent innovations in programming language design. Haskell provides higher-order functions, non-strict semantics, static polymorphic typing, user-defined algebraic datatypes, pattern-matching, list comprehensions, a module system, a monadic I/O system, and a rich set of primitive datatypes, including lists, arrays, arbitrary and fixed precision integers, and floating-point numbers. Haskell is both the culmination and solidification of many years of research on non-strict functional languages."_ [@peyton_jones_haskell_2003]

<!-- 
* - general purpose -
* - purely functional programming -
* - higher-order functions -
* non-strict semantics
* static polymorphic typing
* user-defined algebraic datatypes
* - pattern-matching -
* list comprehensions
* module system
* monadic I/O system
 -->

This quote stems from Simon Peyton Jones and his paper "Haskell 98 language and libraries: the revised report" and was used as well by Simon Marlow in his paper "Haskell 2010 Language Report". [@marlow_haskell_2010] It does sum up the important features of the Haskell programming language. In the following I try to explain the listed terms.

Haskell is a general purpose programming language which means it can be used to develop a web-server, a desktop application as well as a simple commandline tool. It is suited for a wide range of application domains. Haskell is a purely functional programming language, that is, it follows the functional programming paradigm and every pure function has no side effect. Functional programming relies on a mathematical approach where every calculation is defined by expressions. Everything is an expression, wether it's a function or a value. Purely means, that a function only works with its input arguments and returns the same result no matter how often it is called with the same arguments. Every expression is immutable so once they are defined they cannot be changed anymore. In contrast, imperative programming languages allow mutability and functions are subroutines that can have side effects. A side effect for instance can be a simple tracing that doesn't effect the function's result or it can be the change of a global state.

```haskell
-- example of a pure function
mul a b = a * b

-- example of an impure function
mulM a b = do
    putStrLn ("multiplying " ++ (show a) ++ " with " ++ (show b))
    return (a * b)
```

Haskell has higher-order function and emphasizes their usage. Higher-order function are functions that require functions as input parameters or return a function. Therefore functions are data that can be passed round. Thanks to currying all functions are higher-order functions and thereby expressions. Currying means that a function always returns a new function if it isn't called with the full list of arguments.

```haskell
-- example for a higher-order function
map :: (a -> b) -> [a] -> [b]
map _ []     = []               -- special case for an empty list
map f (x:xs) = f x : map f xs   -- f applied to the list's head
                                -- recursive call of map with
                                -- the list's rest
```

The example from above also shows pattern-matching, a rich programming technique to identify certain cases for a given expression. The `map` function from above has two implementations, one for this case of the empty list which also is the base case for the recursion, and the main implementation that declares the algorithm of the function.

[@osullivan_real_2010]


## Yesod Web Framework

[@snoyman_developing_2012]

### Routes

### Templates

### Persistence
