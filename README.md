1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer: 1.1: we can catch unique item called (id) with getElementById. 
1.2: We can catch common item called (class) with getElementsByClassName, as it can be multiple item with same class, that's why Elements(Plural).
1.3: querySelector is used to catch id or class, with . and # notation , single element.
1.4: querySelectorAll is used to catch multiple elements.

2. How do you create and insert a new element into the DOM?
Answer: As I used this method directly, I can show an example
const div = document.createElement("div");
Here, we can see a took a variable, and simple naming funtion same as implementation (createElement = create element), then inside the bracket what kind of element we want to create. it can be ( p, h1, button, div, section).
We can use appendChild() to insert something or what we already created before.

3. What is Event Bubbling? And how does it work?
Answer: As we used, if we occur any event in html element or anywhere in document, how it will react. 
Example:
<div>
    <button id="clk">Click Me</button>
</div>
document.getElementById("clk").addEventListener("click", function() {
    console.log("Button clicked");
});

4. What is Event Delegation in JavaScript? Why is it useful?
Answer: Suppose, a father has 4 babies. you will give order to parents, then parent will pass to his children, rather we needed to tell each baby once.

5. What is the difference between preventDefault() and stopPropagation() methods?
Answer: preventDefault() means, stop default behavior. 
<a href="https://google.com">Google</a>
document.getElementById("myLink").addEventListener("click", function(e) {
  e.preventDefault(); 
  console.log("Link Not working");
  If we click on Google, it should go to the link, but as we used preventDefault funtion, it will not go to that link.

  stopPropagation() is used to stop Event bubbling, means it will not go to his parent.

