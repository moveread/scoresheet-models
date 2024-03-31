# Scoresheet Models

> Tools for storing, rendering and parsing chess scoresheet models

## Model images (JS Package)

```jsx
import { images } from 'scoresheet-models/images'

<img src={images.fcde.l} /> // yeah, really. Vite will figure it out and include it inside assets
```

## Model representation

### Premises

Chess scoresheet models are a small subset of general grids. Thus, their representation is succint. Here, we model models that follow these assumptions:

- All boxes (aka cells) are equally-sized
- All rows of boxes are contiguous
- Boxes are grouped into blocks of 2 contiguous columns

### Representation

Based on these premises, we can univocally define a model by:

- Box (aka cell) width $w$
- Number of rows $n$
- Column offsets + blocks: $C = (x_1,...,x_{b_1},\sqcup, x_{b_1+1}, ..., x_{b_2}, \sqcup, x_{b_2+1}, ..., x_m)$

#### Column offsets representation
- $x_i$ are offsets of extra columns (that belong to the grid but are not adjacent to any relevant cell)
- Blanks ($\sqcup$) represent the positions where blocks go

> Each block is composed of two columns of width $w$, so the actual column offsets can be obtained by replacing $\sqcup$'s by $w, w$

We refer to these expanded column offsets as $C_o$

#### Scale

For simplicity, we enforce a conventional grid size of $(1, 1)$. Thus, we require that:

$$\sum_{x\in C_o} = 1$$
(sum of column offsets adds up to 1)