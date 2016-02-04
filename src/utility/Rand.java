package utility;

import java.util.Random;

public class Rand {
	public int generateId()
	{
		Random rnd = new Random(System.currentTimeMillis());
		
	    int rand =(rnd.nextInt(900) + 100);
	   System.out.println("rand *****"+rand);
	    return rand;
	}
}
