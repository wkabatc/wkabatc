import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class AppFrame extends JFrame implements ActionListener{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public JButton up = new JButton("up");
	public JButton down = new JButton("down");
	public JButton left = new JButton("left");
	public JButton right = new JButton("right");
	public BorderLayout layout = new BorderLayout();
	public Animation animacja;
	public JPanel menuPanel;
	
	public AppFrame(){
		setTitle("tytul");
		setSize(500,500);
		setResizable(false);
		setLocationRelativeTo(null);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		initGUI();
	}
	
	

	private void initGUI() {
		this.setLayout(new BorderLayout());
		animacja = new Animation();
		menuPanel=new JPanel();
		menuPanel.setSize(500,200);
		this.add(animacja, BorderLayout.CENTER);
		this.add(menuPanel, BorderLayout.SOUTH);
		menuPanel.add(up);
		menuPanel.add(down);
		menuPanel.add(left);
		menuPanel.add(right);
		
		up.addActionListener(this);
		down.addActionListener(this);
		left.addActionListener(this);
		right.addActionListener(this);

	}



	@Override
	public void actionPerformed(ActionEvent e) {
		Object source = e.getSource();
		
		if(source==up){
			animacja.setA(0);
			animacja.setB(-1);
		}else if(source==down){
			animacja.setA(0);
			animacja.setB(1);
		}else if(source==left){
			animacja.setA(-1);
			animacja.setB(0);
		}else if(source==right){
			animacja.setA(1);
			animacja.setB(0);

		}
		
	}
	

}
