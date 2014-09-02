SimpleRpiGpio
=============

Very simple class to Raspberry PI's GPIO port usage

## Installation

You can install the library with NPM:

<pre><code>$ npm install git://github.com/jvcalderon/SimpleRpiGpio</code></pre>

Now you only need to require SimpleRpiGpio in your project:

<pre><code>var gpio = require('SimpleRpiGpio');</code></pre>

In Raspberry PI, only root can use GPIO pin. You have to install [quick2wire-gpio-admin](https://github.com/quick2wire/quick2wire-gpio-admin) to use the library without sudo. if you haven't yet installed this plugin, you can do it as follows:

<pre><code>$ git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
$ cd quick2wire-gpio-admin
$ make && sudo make install
$ sudo adduser $USER gpio</code></pre>

## Library methods

<table>
	<thead>
		<tr>
			<td><strong>Method</strong></td>
			<td><strong>Parameters</strong></td>
			<td><strong>Description</strong></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>open</td>
			<td>(pinNumber, direction [out|in])</td>
			<td>Open a GPIO pin by using the pin number. This action is needed before read or write</td>
		</tr>
		<tr>
			<td>openAll</td>
			<td>(direction [out|in])</td>
			<td>Open all GPIO pins with same direction (out or in)</td>
		</tr>
		<tr>
			<td>out</td>
			<td>(pinNumber, action [0|1])</td>
			<td>Sends signal to Rpi's GPIO pin number</td>
		</tr>
		<tr>
			<td>getGpioNumber</td>
			<td>(pinNumber)</td>
			<td>Get the GPIO number associated to pin number</td>
		</tr>
	</tbody>
</table>

## Usage

First you need to open the pins needed to write (out) or read (in). For example:

<pre><code>gpio.open(7, 'out'); //to open GPIO4 (pin number 7)</code></pre>

Use method openAll if you need open all pins for write or read:

<pre><code>gpio.openAll('out'); //for write</code></pre>

Now, you can send a signal (0 for low voltage - false, 1 for high voltage - true) by out method:

<pre><code>gpio.out(7, 1); //HV - true</code></pre>

If you need more information about Raspberry Pi's GPIO usage, you can read [Cómo usar los pines GPIO de la Raspberry PI](http://www.frontandback.org/laboratory/como_usar_gpio_raspberry_pi) (in spanish)
