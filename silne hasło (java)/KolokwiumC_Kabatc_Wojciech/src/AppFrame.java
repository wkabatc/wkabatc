import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

public class AppFrame extends JFrame implements ActionListener{
	
	public JTextField haslo = new JTextField();
	public JButton oblicz = new JButton("Oblicz");
	public JTextField wynik = new JTextField();
	
	public AppFrame() {
		setTitle("Silne has³o");
		setSize(500,500);
		setLocationRelativeTo(null);
		setResizable(false);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		initGUI();
	}
	

	private void initGUI() {
		GridLayout siatka = new GridLayout(3,1);
		setLayout(siatka);
		
		this.add(haslo);
		this.add(oblicz);
		this.add(wynik);
		
		oblicz.addActionListener(this);
		
	}


	@Override
	public void actionPerformed(ActionEvent e) {
		Object source = e.getSource();
		if(source==oblicz) {
			if(haslo.getText().equals("")) {
				JOptionPane.showMessageDialog(null, "Wprowad¿ has³o");
			}
			else {
				int wyn = 0;
				boolean czywielka = false;
				boolean czymala = false;
				boolean czycyfra = false;
				boolean czyspecjalny = false;
				
				for(int i=1; i<=haslo.getText().length(); i++) {
					wyn=i;
				}
				
				for(int i=0; i<haslo.getText().length(); i++) {
					int kod = haslo.getText().charAt(i);
					if(kod>=65 && kod<=90) {
						czywielka=true;
					}
				}
				
				for(int i=0; i<haslo.getText().length(); i++) {
					int kod = haslo.getText().charAt(i);
					if(kod>=97 && kod<=122) {
						czymala=true;
					}
				}
				
				for(int i=0; i<haslo.getText().length(); i++) {
					int kod = haslo.getText().charAt(i);
					if(kod>=48 && kod<=57) {
						czycyfra=true;
					}
				}
				
				for(int i=0; i<haslo.getText().length(); i++) {
					int kod = haslo.getText().charAt(i);
					if((kod>=33 && kod<=47) || (kod>=58 && kod<=64) || (kod>=91 && kod<=96) || (kod>=123 && kod<=126)) {
						czyspecjalny=true;
					}
				}
				
				
				if(wyn>=12 && czywielka==true && czymala==true && czycyfra==true && czyspecjalny==true) {
				String w = Integer.toString(wyn);
				wynik.setText("podane has³o jest silne");
				}
				else {
					wynik.setText("podane has³o nie jest silne");
				}
				
			}
		}
		
	}

}
