<h1 align="center">Cyberpunk 2077 Breach Protocol</h1>
<h2 id="description">✨ Description </h2>

Cyberpunk 2077 Breach Protocol is a hacking minigame in the video game <a href="https://www.cyberpunk.net/">Cyberpunk 2077</a>. This minigame simulates the hacking of a local network's Intrusion Countermeasures Electronics (ICE) within the Cyberpunk 2077 game.
The components in this game include:

- Token – consisting of two alphanumeric characters such as E9, BD, and 55.
- Matrix – comprising tokens that will be selected to form a sequence of tokens.
- Sequence – a series of tokens (two or more) that need to be matched.
- Buffer – the maximum number of tokens that can be arranged sequentially.

This program aims to solve breach protocol game using brute force algorithm that involves attempting all possible buffer combinations until the optimal one is found. 
The output of this program included the arrangement of tokens, the maximum achievable reward points, and the coordinates of tokens required to achieve the highest score. 
Additionaly, users can view the runtime and download the results.

<h2 id="table-of-contents">🔍 Table of Contents</h2>
- <a href="#description">Description</a><br/>
- <a href="#table-of-contents">Table of Contents</a><br/>
- <a href="#tech-stack">Tech Stack</a><br/>
- <a href="#how-to-run">How To Run</a><br/>
- <a href="#usage">Usage</a><br/>
- <a href="#author">Author</a><br/>
- <a href="#note">Additional Note</a>

<h2 id="tech-stack">💻 Tech Stack</h2>

- Typescript
- Next.js
- Tailwind CSS
- Node.js
- sweetalert2

<h2 id="how-to-run">🏃 How To Run</h2>

You will need Node.js and npm (or yarn) if you want to run this repository locally. Follow the instructions from this [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all the requirements if you don't have them.
- Clone this project
```
git clone https://github.com/ninoaddict/Tucil1_13522068
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run the project
```
npm run dev
```
This project can also be accessed in this [link](https://breach-protocol-solver.vercel.app/). However, I would recommend running the project locally if you aim for faster runtime or if you have relatively large inputs, as the server has a maximum timeout of 10 seconds.

<h2 id="usage">🐈‍⬛ Usage</h2>

1. Select your input mode
  ![File Input](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/file_input.png)
  ![Random Input](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/random_input.png)
2. Upload your .txt file or enter the inputs in the provided entries
  ![Upload File](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/file_input_filled.png)
  ![Fill Random Input Field](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/random_input_filled.png)
3. If you select the file input mode, please make sure that your .txt file is in the following format
 ```
buffer_size
matrix_width matrix_height
matrix
number_of_sequences
sequences_1
sequences_1_reward
sequences_2
sequences_2_reward
…
sequences_n
sequences_n_reward
```  
4. Click solve to see the result
  ![Click](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/random_input_filled.png)
5. You can download the result by clicking the download button
  ![Result](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/result.png)

<h2 id="author">🤵 Author</h2>
<pre>
  Name  : Adril Putra Merin
  NIM   : 13522068
  Email : <a href="mailto:13522068@std.stei.itb.ac.id">13522068@std.stei.itb.ac.id</a>
</pre>

<h2 id="note">📓 Additional Note</h2>

The main program files, including the brute force algorithm and backend processes, are located within the specified path.

```
./src/breach_protocol/app/lib
```
