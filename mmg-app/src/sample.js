import React, { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './sample.css';

const Sample = () => {
  useEffect(() => {
    const words = document.querySelectorAll('.main-heading span');

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-paradigm", // The section to trigger the animation
        start: "top top", // Start when the top of the section hits the top of the viewport
        end: "bottom top", // Optional: end when the bottom of the section hits the top of the viewport
        once: true // Animation will only happen once
      }
    });

    // Animate each word
    words.forEach((word, index) => {
      tl.to(word, {
        opacity: 1,
        x: 0,
        duration: 1, // Shorter duration for quicker animation
        delay: index * 0.5 // Shorter delay between each word
      }, "<"); // "<" means to start at the same time as the previous animation
    });

    return () => {
      // Cleanup ScrollTrigger on unmount
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <div className='container' style={{ height: "" }}>
        <h1> Hiii</h1>
      </div>
      <div className='section-container'>
        <h1>Cards</h1>
        <p>Reading is a product of two simultaneous cognitive elements: decoding and comprehension.

          When we first begin to read, we learn that certain symbols stand for concepts. We start by recognizing letters and associating the forms with the sounds they represent. Then we move to recognizing entire words and what they mean. Once we’ve processed those individual words, we can move on to comprehension: Figuring out what the writer meant by stringing those words together. It’s difficult work, particularly if you’re just learning to read or you’re one of the nearly 50% of the population who have low literacy skills.

          While it’s tempting to have someone read your text and ask them if they understood it, you shouldn’t rely on a simple “yes” answer. It’s possible to recognize every word (decode), yet misunderstand the intended meaning (comprehend). You’ve probably experienced this yourself: Ever read something only to reach the end and realize you don’t understand what you just read? You recognize every word, but because the writing isn’t clear, or you’re tired, the meaning of the passage escapes you. Remember, too, that if someone misinterpreted what they read, there’s no way to know unless you ask questions to assess their comprehension.

          So how do you find out whether your content will work for your users? Let’s look at how to predict whether it will work (without users) and test whether it does work (with users).

          Estimate it
          Readability formulas measure the elements of writing that can be quantified, such as the length of words and sentences, to predict the skill level required to understand them. They can be a quick, easy, and cheap way to estimate whether a text will be too difficult for the intended audience. The results are easy to understand: many state the approximate U.S. grade level of the text.

          You can buy readability software. There are also free online tools from Added Bytes, Juicy Studio, and Edit Central; and there’s always the Flesch-Kincaid Grade Level formula in Microsoft Word.

          But there is a big problem with readability formulas: Most features that make text easy to understand—like content, organization, and layout—can’t be measured mathematically. Using short words and simple sentences doesn’t guarantee that your text will be readable. Nor do readability formulas assess meaning. Not at all. For example, take the following sentence from A List Apart’s About page and plug it into a readability formula. The SMOG Index estimates that you need a third grade education to understand it:

          We get more mail in a day than we could read in a week.

          Now, rearrange the words into something nonsensical. The result: still third grade.

          In day we mail than a week get more in a could we read.

          Readability formulas can help you predict the difficulty level of text and help you argue for funding to test it with users. But don’t rely on them as your only evaluation method. And don’t rewrite just to satisfy a formula. Remember, readability formulas estimate how difficult a piece of writing is. They can’t teach you how to write understandable copy.

          Do a moderated usability test
          To find out whether people understand your content, have them read it and apply their new knowledge. In other words, do a usability test! Here’s how to create task scenarios where participants interpret and use what they read:

          Identify the issues that are critical to users and the business.
          Create tasks that test user knowledge of these issues.
          Tell participants that they’re not being tested; the content is.
          Let’s say you’re testing SEPTA, a mass transit website. It offers several types of monthly passes that vary based on the mode of transportation used and distance traveled: For example, a TransPass lets you ride on the subway, bus or trolley. A TrailPass also lets you ride the train, etc. If you only wanted to test the interface, you might phrase the task like this:

          Buy a monthly TrailPass.

          But you want to test how well the content explains the difference between each pass so that people can choose the one that’s right for them. So phrase your task like this:

          Buy the cheapest pass that suits your needs.

          See the difference? The first version doesn’t require participants to consider the content at all. It just tells them what to choose. The second version asks them to use the content to determine which option is the best choice for them. Just make sure to get your participants to articulate what their needs are so you can judge whether they chose the right one.

          Ask participants to think aloud while they read the content. You’ll get some good insight on what they find confusing and why. Ideally, you want readers to understand the text after a single reading. If they have to re-read anything, you must clarify the text. Also, ask them to paraphrase some sections; if they don’t get the gist, you’d better rewrite it.

          To successfully test content with task scenarios and paraphrasing, you’ve got to know what the correct answer looks like. If you need to, work with a subject matter expert to create an answer key before you conduct the sessions. You can conduct live moderated usability tests either in person or remotely. But, there are also asynchronous methods you can use.</p>
      </div>
      <div className="paradigm-heading">
        <h1 className="main-heading">
          <span>CHANGING</span> <br />
          <span>THE</span> <br />
          <span>PARADIGM</span>
        </h1>
      </div>
    </>
  )
}
export default Sample