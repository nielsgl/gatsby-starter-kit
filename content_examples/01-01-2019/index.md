---
title: "Something with a notebook"
cover: "https://unsplash.it/1152/300/?random?BirchintheRoses"
date: "01/03/2019"
category: "tech"
tags:
    - programming
---

# Generating Fractals with Python


```python
import numpy as np
# from numba import jit


# @jit
def mandelbrot(c,maxiter):
    z = c
    for n in range(maxiter):
        if abs(z) > 2:
            return n
        z = z*z + c
    return 0
```


```python
# @jit
def mandelbrot_set(xmin,xmax,ymin,ymax,width,height,maxiter):
    r1 = np.linspace(xmin, xmax, width)
    r2 = np.linspace(ymin, ymax, height)
    n3 = np.empty((width,height))
    for i in range(width):
        for j in range(height):
            n3[i,j] = mandelbrot(r1[i] + 1j*r2[j],maxiter)
    return (r1,r2,n3)
```


```python
from matplotlib import pyplot as plt
from matplotlib import colors
%matplotlib inline


def mandelbrot_image(xmin,xmax,ymin,ymax,width=10,height=10,maxiter=256):
	dpi = 72
	img_width = dpi * width
	img_height = dpi * height
	x,y,z = mandelbrot_set(xmin,xmax,ymin,ymax,img_width,img_height,maxiter)

	print(f"x:{x.shape},\ty:{y.shape},\tz:{z.shape}")

	fig, ax = plt.subplots(figsize=(width, height),dpi=72)
	ticks = np.arange(0,img_width,3*dpi)
	x_ticks = xmin + (xmax-xmin)*ticks/img_width
	plt.xticks(ticks, x_ticks)
	y_ticks = ymin + (ymax-ymin)*ticks/img_width
	plt.yticks(ticks, y_ticks)

	ax.imshow(z.T,origin='lower')

	save_image(fig)

```


```python
image_counter = 30

def save_image(fig):
    global image_counter
    filename = "mandelbrodt_%d.png" % image_counter
    image_counter += 1
    fig.savefig(filename)
```


```python
mandelbrot_image(-2.0,0.5,-1.25,1.25, maxiter=50)
```

    x:(720,),	y:(720,),	z:(720, 720)



![png](python-deep-fractals_files/python-deep-fractals_5_1.png)



```python
mandelbrot_image(-2.0,0.5,-1.25,1.25, maxiter=256)
```

    x:(720,),	y:(720,),	z:(720, 720)



![png](python-deep-fractals_files/python-deep-fractals_6_1.png)



```python
mandelbrot_image(-2.0,0.5,-1.25,1.25, maxiter=1024)
```

    x:(720,),	y:(720,),	z:(720, 720)



![png](python-deep-fractals_files/python-deep-fractals_7_1.png)



```python
def mandelbrot_image(xmin,xmax,ymin,ymax,width=10,height=10,maxiter=80,cmap='jet'):
    dpi = 72
    img_width = dpi * width
    img_height = dpi * height
    x,y,z = mandelbrot_set(xmin,xmax,ymin,ymax,img_width,img_height,maxiter)

    fig, ax = plt.subplots(figsize=(width, height),dpi=72)
    ticks = np.arange(0,img_width,3*dpi)
    x_ticks = xmin + (xmax-xmin)*ticks/img_width
    plt.xticks(ticks, x_ticks)
    y_ticks = ymin + (ymax-ymin)*ticks/img_width
    plt.yticks(ticks, y_ticks)
    ax.set_title(cmap)

    ax.imshow(z.T,cmap=cmap,origin='lower')

    save_image(fig)
```


```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=50,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_9_0.png)



```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=256,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_10_0.png)



```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=1024,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_11_0.png)



```python
r1,r2,z = mandelbrot_set(-2.0,0.5,-1.25,1.25,100,100,100)
plt.hist(z)
plt.show()
```


![png](python-deep-fractals_files/python-deep-fractals_12_0.png)



```python
z3 = z ** 0.3
plt.hist(z3)
plt.show()
```


![png](python-deep-fractals_files/python-deep-fractals_13_0.png)



```python
def mandelbrot_image(xmin,xmax,ymin,ymax,width=10,height=10,\
                     maxiter=80,cmap='jet',gamma=0.3):
    dpi = 72
    img_width = dpi * width
    img_height = dpi * height
    x,y,z = mandelbrot_set(xmin,xmax,ymin,ymax,img_width,img_height,maxiter)

    fig, ax = plt.subplots(figsize=(width, height),dpi=72)
    ticks = np.arange(0,img_width,3*dpi)
    x_ticks = xmin + (xmax-xmin)*ticks/img_width
    plt.xticks(ticks, x_ticks)
    y_ticks = ymin + (ymax-ymin)*ticks/img_width
    plt.yticks(ticks, y_ticks)
    ax.set_title(cmap)

    norm = colors.PowerNorm(gamma)
    ax.imshow(z.T,cmap=cmap,origin='lower',norm=norm)

    save_image(fig)
```


```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=50,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_15_0.png)



```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=256,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_16_0.png)



```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=1024,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_17_0.png)



```python
# @jit
def mandelbrot(z,maxiter,horizon,log_horizon):
    c = z
    for n in range(maxiter):
        az = abs(z)
        if az > horizon:
            return n - np.log(np.log(az))/np.log(2) + log_horizon
        z = z*z + c
    return 0

# @jit
def mandelbrot_set(xmin,xmax,ymin,ymax,width,height,maxiter):
    horizon = 2.0 ** 40
    log_horizon = np.log(np.log(horizon))/np.log(2)
    r1 = np.linspace(xmin, xmax, width)
    r2 = np.linspace(ymin, ymax, height)
    n3 = np.empty((width,height))
    for i in range(width):
        for j in range(height):
            n3[i,j] = mandelbrot(r1[i] + 1j*r2[j],maxiter,horizon, log_horizon)
    return (r1,r2,n3)
```


```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=80,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_19_0.png)



```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=256,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_20_0.png)



```python
mandelbrot_image(-2.0,0.5,-1.25,1.25,maxiter=1024,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_21_0.png)



```python
mandelbrot_image(-0.8,-0.7,0,0.1,cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_22_0.png)



```python
mandelbrot_image(-0.8,-0.7,0,0.1, maxiter=1024, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_23_0.png)



```python
mandelbrot_image(-0.8,-0.7,0,0.1, maxiter=1024, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_24_0.png)



```python
mandelbrot_image(-0.755, -0.745 , 0.06, 0.07, maxiter=1024, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_25_0.png)



```python
mandelbrot_image(-0.755, -0.745 , 0.06, 0.07, maxiter=2048, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_26_0.png)



```python
mandelbrot_image(-0.755, -0.745 , 0.06, 0.07, maxiter=2048, cmap='jet')
```


![png](python-deep-fractals_files/python-deep-fractals_27_0.png)



```python
mandelbrot_image(-0.75, -0.747 , 0.063, 0.066, maxiter=1024, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_28_0.png)



```python
mandelbrot_image(-0.75, -0.747 , 0.063, 0.066, maxiter=2048, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_29_0.png)



```python
mandelbrot_image(-0.749, -0.748 , 0.065, 0.066, maxiter=512, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_30_0.png)



```python
mandelbrot_image(-0.749, -0.748 , 0.065, 0.066, maxiter=1024, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_31_0.png)



```python
mandelbrot_image(-0.749, -0.748 , 0.065, 0.066, maxiter=2048, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_32_0.png)



```python
mandelbrot_image(-0.749, -0.748 , 0.065, 0.066, maxiter=4096, cmap='hot')
```


![png](python-deep-fractals_files/python-deep-fractals_33_0.png)



```python

```
