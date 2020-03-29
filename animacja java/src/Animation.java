import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.JPanel;

public class Animation extends JPanel implements Runnable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int x=200, y=150;
	private int a,b;
	
	public int getA(){
		return a;
	}
	public void setA(int a){
		this.a=a;
	}
	
	public int getB(){
		return b;
	}
	public void setB(int b){
		this.b=b;
	}
	
	public Animation() {
		Thread x = new Thread(this);
		x.start();
	}
	
	public void paint(Graphics g){
		super.paint(g);
		setBackground(Color.WHITE);
		Graphics2D g2=(Graphics2D) g;
		g2.fillRect(x, y, 100, 100);
		g2.dispose();
	}
	
	@Override
	public void run() {
		
		while(true){
		
		movement();
		repaint();
		
		try{
			Thread.sleep(10);
		}catch (InterruptedException e){
			System.out.println("error");
		}
		
		}
		
	}
	
	private void movement() {
		x=x+a;
		y=y+b;
		
		if(x==0){
			a=1;
		}
		else if (x==400){
			a=-1;
		}
	}

}
